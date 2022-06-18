import { ComponentType } from 'react';

// Any used to describe component with random props.
type Component = ComponentType<any>;

export class CmsConnectedRepository {
  private readonly repository: Map<string, Component>;

  constructor() {
    this.repository = new Map();
  }

  public registerComponent(contentTypeId: string, component: Component): void {
    this.repository.set(contentTypeId, component);
  }

  public getComponent(contentTypeId: string): Component | null {
    const component = this.repository.get(contentTypeId);

    if (!component) {
      console.error('No component registered for content type ID:', contentTypeId);

      return null;
    }

    return component;
  }
}
