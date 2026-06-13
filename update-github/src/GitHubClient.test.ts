import { readFileSync } from 'node:fs';
import path from 'node:path';

import { GitHubClient, type Repository, type Tag, type User } from './GitHubClient.ts';

interface GitHubResponses {
  repositories?: Response;
  tags?: Response;
  user?: Response;
}

interface ResponseOptions {
  link?: string;
  ok?: boolean;
}

function readFixture(name: string): string {
  return readFileSync(path.join(__dirname, '__fixtures__', name), 'utf8');
}

const user = JSON.parse(readFixture('user.json')) as User;
const repositories = JSON.parse(readFixture('repositories.json')) as Repository[];
const tags = JSON.parse(readFixture('tags.json')) as Tag[];

const baseUrl = 'https://api.github.com';
const personalAccessToken = 'personal-access-token';

function buildInvalidResponse(): Response {
  return {
    headers: new Headers(),
    json: () => Promise.reject(new Error('invalid json')),
    ok: true,
  } as unknown as Response;
}

function buildRepository(overrides: Partial<Repository> = {}): Repository {
  return {
    archived: false,
    description: 'description',
    homepage: 'https://homepage',
    html_url: 'https://github.com/loginov-rocks/repo',
    language: 'TypeScript',
    name: 'repo',
    owner: { login: 'loginov-rocks' },
    stargazers_count: 5,
    updated_at: '2024-02-21T06:18:15Z',
    ...overrides,
  };
}

function buildResponse(body: unknown, { link, ok = true }: ResponseOptions = {}): Response {
  const headers = new Headers();

  if (link) {
    headers.set('Link', link);
  }

  return { headers, json: () => Promise.resolve(body), ok } as unknown as Response;
}

const mockFetch = jest.fn();

globalThis.fetch = mockFetch;

function mockGitHub({
  repositories: repositoriesResponse = buildResponse([]),
  tags: tagsResponse = buildResponse([]),
  user: userResponse = buildResponse(user),
}: GitHubResponses = {}): void {
  mockFetch.mockImplementation((url: string) => {
    if (url.endsWith('/user')) {
      return Promise.resolve(userResponse);
    }
    if (url.includes('/user/repos')) {
      return Promise.resolve(repositoriesResponse);
    }
    if (url.includes('/tags')) {
      return Promise.resolve(tagsResponse);
    }

    throw new Error(`Unexpected URL: ${url}`);
  });
}

describe('GitHubClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws when getting data without a personal access token', async () => {
    const gitHubClient = new GitHubClient({ baseUrl });

    await expect(gitHubClient.getData()).rejects.toThrow('Personal access token is not set');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('returns the normalized data and authorizes every request', async () => {
    mockGitHub({ repositories: buildResponse(repositories), tags: buildResponse(tags) });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    const data = await gitHubClient.getData();

    expect(data.homepageUrl).toBe(user.blog);
    expect(data.login).toBe(user.login);
    expect(data.url).toBe(user.html_url);
    expect(data.repositories).toHaveLength(repositories.length);
    expect(data.repositories[0].name).toBe(repositories[0].name);
    expect(data.repositories[0].latestTag).toBe(tags[0].name);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/user`, {
      headers: {
        'Authorization': `token ${personalAccessToken}`,
        'X-GitHub-Api-Version': '2026-03-10',
      },
    });
  });

  it('uses the personal access token set after construction', async () => {
    mockGitHub();

    const gitHubClient = new GitHubClient({ baseUrl });
    gitHubClient.setPersonalAccessToken(personalAccessToken);

    const data = await gitHubClient.getData();

    expect(data.repositories).toHaveLength(0);
  });

  it('follows pagination and merges every page into a single collection', async () => {
    const repositoryA = buildRepository({ name: 'repo-a' });
    const repositoryB = buildRepository({ name: 'repo-b' });

    mockFetch.mockImplementation((url: string) => {
      if (url.endsWith('/user')) {
        return Promise.resolve(buildResponse(user));
      }
      if (url.includes('/user/repos')) {
        return Promise.resolve(url.includes('page=2')
          ? buildResponse([repositoryB])
          : buildResponse([repositoryA], { link: `<${baseUrl}/user/repos?page=2>; rel="next"` }));
      }
      if (url.includes('/tags')) {
        return Promise.resolve(buildResponse([]));
      }

      throw new Error(`Unexpected URL: ${url}`);
    });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    const data = await gitHubClient.getData();

    expect(data.repositories.map(repository => repository.name)).toEqual(['repo-a', 'repo-b']);
    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/user/repos?page=2`, expect.anything());
  });

  it('reuses only the path of the next link so it cannot be redirected to another host', async () => {
    mockFetch.mockImplementation((url: string) => {
      if (url.endsWith('/user')) {
        return Promise.resolve(buildResponse(user));
      }
      if (url.includes('/user/repos')) {
        return Promise.resolve(url.includes('page=2')
          ? buildResponse([buildRepository()])
          : buildResponse([buildRepository()], { link: '<https://evil.example.com/user/repos?page=2>; rel="next"' }));
      }
      if (url.includes('/tags')) {
        return Promise.resolve(buildResponse([]));
      }

      throw new Error(`Unexpected URL: ${url}`);
    });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await gitHubClient.getData();

    expect(mockFetch).toHaveBeenCalledWith(`${baseUrl}/user/repos?page=2`, expect.anything());
    expect(mockFetch).not.toHaveBeenCalledWith(expect.stringContaining('evil.example.com'), expect.anything());
  });

  it('stops paginating when the Link header has no next page', async () => {
    mockGitHub({
      repositories: buildResponse([buildRepository()], { link: `<${baseUrl}/user/repos?page=1>; rel="prev"` }),
      tags: buildResponse(tags),
    });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    const data = await gitHubClient.getData();

    expect(data.repositories).toHaveLength(1);
  });

  it('normalizes nullable fields and repositories without tags', async () => {
    const repository = buildRepository({ description: null, homepage: null, language: null });

    mockGitHub({ repositories: buildResponse([repository]) });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    const data = await gitHubClient.getData();

    expect(data.repositories[0]).toEqual({
      description: null,
      homepageUrl: null,
      isArchived: false,
      language: null,
      latestTag: null,
      name: 'repo',
      stars: 5,
      updatedAt: new Date(repository.updated_at).getTime(),
      url: repository.html_url,
    });
  });

  it('throws when the user request fails', async () => {
    mockGitHub({ user: buildResponse(user, { ok: false }) });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await expect(gitHubClient.getData()).rejects.toThrow('GitHub user request failed');
  });

  it('throws when parsing the user response as JSON fails', async () => {
    mockGitHub({ user: buildInvalidResponse() });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await expect(gitHubClient.getData()).rejects.toThrow('Failed to parse the GitHub user response as JSON');
  });

  it('throws when listing the repositories fails', async () => {
    mockGitHub({ repositories: buildResponse([], { ok: false }) });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await expect(gitHubClient.getData()).rejects.toThrow('GitHub collection request failed');
  });

  it('throws when parsing the repositories response as JSON fails', async () => {
    mockGitHub({ repositories: buildInvalidResponse() });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await expect(gitHubClient.getData()).rejects.toThrow('Failed to parse the GitHub collection response as JSON');
  });

  it('throws when the tags request fails', async () => {
    mockGitHub({ repositories: buildResponse([buildRepository()]), tags: buildResponse([], { ok: false }) });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await expect(gitHubClient.getData()).rejects.toThrow('GitHub tags request failed');
  });

  it('throws when parsing the tags response as JSON fails', async () => {
    mockGitHub({ repositories: buildResponse([buildRepository()]), tags: buildInvalidResponse() });

    const gitHubClient = new GitHubClient({ baseUrl, personalAccessToken });

    await expect(gitHubClient.getData()).rejects.toThrow('Failed to parse the GitHub tags response as JSON');
  });
});
