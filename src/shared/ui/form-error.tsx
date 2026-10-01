import { Flex, Typography } from "@maxhub/max-ui";

import { WarningIcon } from "./icons";

import classes from "./form-error.module.css";

interface FormErrorProps {
  children: string;
}

export function FormError({ children }: FormErrorProps) {
  return (
    <Flex align="center" gap="var(--spacing-size-m)" className={classes.root} role="alert">
      <WarningIcon size={16} className={classes.icon} />
      <Typography.Text variant="description" className={classes.text}>
        {children}
      </Typography.Text>
    </Flex>
  );
}
