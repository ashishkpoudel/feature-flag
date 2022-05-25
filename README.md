# Feature Manager

Feature Manager (also called feature toggle, feature flag) makes it easier to enable or disable feature based on specified configuration.

## Installation

You can install the package via npm:

```
npm install feature-manager
```

## Usage

Feature must be declared as a class. Feature flag configuration is then applied by using `@FeatureFlag` decorator.


## Example

```typescript
@FeatureFlag('production', { enabled: false })
@FeatureFlag('staging', { enabled: true })
class HostReport implements Feature {}
```

Above we've declared a feature called `HostReport` with feature flag configuration applied for two environments. Now we'll need to initialize feature manager and check if specified feature is enabled or not based on environment.

```typescript
const featureManager = new FeatureManager(process.env.APP_ENV);
if (featureManager.isEnabled('HostReport')) {
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
