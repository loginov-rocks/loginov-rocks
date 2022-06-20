import { ComponentType } from 'react';

// Any used to describe component with random props.
type Component = ComponentType<any>;

export class CmsConnectedRepository {
  private readonly repository: Map<string, Component>;

  constructor() {
    this.repository = new Map();
  }

  public registerComponent(cmsComponentType: string, implementation: Component): void {
    this.repository.set(cmsComponentType, implementation);
  }

  public getComponent(cmsComponentType: string): Component | null {
    const implementation = this.repository.get(cmsComponentType);

    if (!implementation) {
      console.error('No implementation registered for type:', cmsComponentType);

      return null;
    }

    return implementation;
  }
}
