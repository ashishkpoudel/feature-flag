### NOTE: under rapid development, not ready for production use

---

# Feature Management

Feature Management (also called feature toggle, feature flag) makes it easier to enable or disable feature based on specified configuration.

## Installation

You can install the package via npm:

```
npm install feature-management
```

## Usage

Feature must be declared as a class. Feature flag configuration is then applied by using `@FeatureFlag` decorator.


## Example

### Basic usage

```typescript
@FeatureFlag('production', false)
@FeatureFlag('staging', true)
class HostReport implements IFeature {}
```

Above we've declared a feature called `HostReport` with feature flag configuration applied for multiple environment. Last step is to initialize feature manager and check if specified feature is enabled or not based on current environment.

```typescript
if (await featureManager.isEnabled(HostReport)) {
  // run this block if enabled
}
```

### Advance usage with feature filter
Feature filter helps you enable a feature based on condition defined. You can assign multiple filters to a feature.

```typescript
interface AppContext {
  readonly email?: string;
}

class AllowUsersFilter {
  constructor(readonly emails: readonly string[]) {}
}

@FeatureFilterHandler(AllowUsersFilter)
class AllowUsersFilterHandler implements IFeatureFilterHandler<AllowUsersFilter, AppContext> {
  async evaluate(filter: AllowUsersFilter, context: AppContext) {
    if (!context?.email) {
      throw new Error('AllowUsersFilter requires param: email');
    }

    return filter.emails.includes(context.email);
  }
}
```

Assign filters to a feature
```typescript
@FeatureFlag('production', [new AllowUsersFilter(['john@gmail.com', 'doe@gmail.com'])])
@FeatureFlag('staging', true)
class HostReport implements IFeature {}
```

Finally, you can check if feature is enabled using feature manager.

```typescript
const context = {
  email: 'john@gmail.com'
};

if (await featureManager.isEnabled(HostReport, context)) {
  // run this block if enabled
}
```

## Testing

```
npm run test
```

## Credits
- [Ashish K. Poudel](https://github.com/ashishkpoudel)
- [All Contributors](../../contributors)
