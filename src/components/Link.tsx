import * as Headless from "@headlessui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Link = React.forwardRef(function Link(
  props: { href: string } & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Headless.DataInteractive>
      <RouterLink to={props.href} {...props} ref={ref} />
    </Headless.DataInteractive>
  );
});

export default Link;
