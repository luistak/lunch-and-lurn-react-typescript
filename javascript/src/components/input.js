export const Input = ({ prefixComponent, ...props }) => (
  <>
    {prefixComponent}
    <input {...props} />
  </>
);
