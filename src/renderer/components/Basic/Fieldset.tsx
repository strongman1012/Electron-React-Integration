import React, { ReactNode, FC } from 'react';

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  children: ReactNode;
}

const Fieldset: FC<FieldsetProps> = ({ title, children, ...props }) => {
  return (
    <fieldset {...props} style={{ borderRadius: '8px', borderColor: '#e34747', borderStyle: 'solid', display: 'flex', justifyContent: 'center' }}>
      {title && <legend>{title}</legend>}
      {children}
    </fieldset>
  );
};

export default Fieldset;
