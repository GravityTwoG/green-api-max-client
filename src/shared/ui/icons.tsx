import type { PropsWithChildren, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function IconBase({ children, size = 24, ...rest }: PropsWithChildren<IconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      focusable="false"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        d="m7.825 13 4.887 4.888a.999.999 0 0 1-1.412 1.413l-6.593-6.593a1 1 0 0 1 0-1.415L11.3 4.7a.999.999 0 1 1 1.412 1.413L7.825 11H19a1 1 0 1 1 0 2z"
      />
    </IconBase>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.29 11.705a1 1 0 0 1 .005-1.415l6.015-5.97a1 1 0 0 1 1.41.001l5.987 5.972a1 1 0 0 1-1.412 1.416l-4.28-4.27v11.533a1 1 0 1 1-2 0V7.43l-4.31 4.279a1 1 0 0 1-1.414-.005"
        clipRule="evenodd"
      />
    </IconBase>
  );
}

export function SentIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.09 5.589a.9.9 0 0 1 0 1.272L7.063 17.886a.9.9 0 0 1-1.273 0L1.884 13.98a.9.9 0 0 1 1.273-1.273l3.27 3.271L16.818 5.59a.9.9 0 0 1 1.272 0"
        clipRule="evenodd"
      />
    </IconBase>
  );
}

export function ReadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.089 5.589a.9.9 0 0 1 0 1.272L7.064 17.886a.9.9 0 0 1-1.273 0L1.883 13.98a.9.9 0 0 1 1.273-1.273l3.271 3.271L16.816 5.59a.9.9 0 0 1 1.273 0m5.459-.001a.9.9 0 0 1 0 1.273L12.523 17.887a.9.9 0 0 1-1.272 0l-.73-.73a.9.9 0 0 1 1.273-1.272l.093.092L22.276 5.59a.9.9 0 0 1 1.272 0"
        clipRule="evenodd"
      />
    </IconBase>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" fill="#FF303C" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M13.125 7.501V12.5a1.125 1.125 0 0 1-2.25 0V7.501a1.125 1.125 0 0 1 2.25 0m-2.5 8.999a1.375 1.375 0 1 1 2.75 0 1.375 1.375 0 0 1-2.75 0"
        clipRule="evenodd"
      />
    </IconBase>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.64 12c0 .594.274 1.017.48 1.334l.043.068C2.393 15.322 5.985 20 12 20s9.607-4.677 10.837-6.598l.044-.068c.205-.317.479-.74.479-1.334s-.274-1.017-.48-1.334l-.043-.068C21.607 8.678 18.015 4 12 4S2.393 8.678 1.163 10.598l-.044.068C.914 10.983.64 11.406.64 12m2.207.323-.145-.23L2.65 12q.015-.03.053-.093c.037-.061.082-.132.145-.23C4.014 9.855 7.085 6 12 6s7.986 3.855 9.153 5.677c.063.098.108.169.145.23l.053.093-.053.093-.145.23C19.986 14.145 16.915 18 12 18s-7.986-3.855-9.153-5.677"
        clipRule="evenodd"
      />
    </IconBase>
  );
}

export function EyeCrossedIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4.682 3.27a1 1 0 0 0-1.39 1.437l1.709 1.708C3.078 7.86 1.802 9.6 1.163 10.598l-.044.068C.914 10.983.64 11.406.64 12s.274 1.017.48 1.334l.043.068C2.393 15.322 5.985 20 12 20c2.033 0 3.789-.534 5.27-1.316l2.023 2.023a1 1 0 0 0 1.438-1.39zm-1.835 8.407c.635-.991 1.833-2.584 3.585-3.83l2.122 2.121a4 4 0 0 0 5.478 5.478l1.741 1.741A9.1 9.1 0 0 1 12 18c-4.915 0-7.986-3.855-9.153-5.677l-.145-.23L2.65 12q.015-.03.053-.093c.037-.061.082-.132.145-.23M10 12q.001-.27.068-.518l2.45 2.45A2.002 2.002 0 0 1 10 12"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M19.475 15.94c.38.38.992.393 1.362.006a17 17 0 0 0 2-2.544l.044-.068c.205-.317.479-.74.479-1.334s-.274-1.017-.48-1.334l-.043-.068C21.607 8.678 18.015 4 12 4c-.772 0-1.504.077-2.197.215-.761.153-.974 1.08-.425 1.628a1.14 1.14 0 0 0 1.01.3A9 9 0 0 1 12 6c4.915 0 7.986 3.855 9.153 5.677.063.098.108.169.145.23l.053.093-.053.093-.145.23a15 15 0 0 1-1.673 2.149c-.389.414-.406 1.067-.005 1.469"
      />
      <path fill="currentColor" d="M15.976 12.441a4 4 0 0 0-4.417-4.417z" />
    </IconBase>
  );
}
