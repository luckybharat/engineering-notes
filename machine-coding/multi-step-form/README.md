# Create Multi-Stepper component in React

Create a multi-stepper component, where the component accepts an arrays of other components and render them in sequence with steps highlighted as the user clicks on next and previous buttons.


```
    <MultiStepper
        steps={[
            <Step1 />,
            <Step2 />,
            <Step3 />
            ]}
        defaultActive={2}
        unmountOnHide
    />
```

## Nice to have features

- defaultActive will keep that particular step active.
- unmountOnHide={true} will remove the component if not active.
- unmountonHide={false} will keep the component in the DOM but it won't be visible.
- While developing the component, make sure you design it in a way that you can include the Nice to have features later.

### Multistepper API:
- steps: ```JSX[]```
- defaultActive=```number```
- unmountOnHide: ```boolean```
