import type { SVGProps } from "react"

export function EmptyCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1}
      {...props}
    >
      <path d="M8.5 7.75L4.5 10l-4-2.25v-4.5L4.5 1l4 2.25zm-4-4.25v4m2-2h-4m4 12h10l4.5-14l2.5-.5m-15 16.5l-2 2l2 2l2-2zm7 0l-2 2l2 2l2-2zm-5-13h9.536" />
      <path d="M17.304 14.999L5 13.5L4.464 12" />
    </svg>
  )
}

export function EmptyOrdersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1}
      {...props}
    >
      <path d="M6.5 2.5h8l3 3v14a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2Z" />
      <path d="M14.5 2.5v4h4" />
      <path d="M8 10h6.5M8 13.5h6.5M8 17h4" />
      <path d="M17.5 16.5l1.5 1.5l3-3" />
    </svg>
  )
}

export function EmptyCollectionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1}
      {...props}
    >
      <circle cx={10} cy={10} r={5.5} />
      <path d="M7.5 10h5" />
      <path d="m14 14 5 5" />
    </svg>
  )
}

export function EmptyAddressIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1}
      {...props}
    >
      <path d="M12 21s5.5-4.3 5.5-10a5.5 5.5 0 1 0-11 0c0 5.7 5.5 10 5.5 10Z" />
      <circle cx={12} cy={10.5} r={2.25} />
      <path d="M18.5 18.5h4" />
      <path d="M20.5 16.5v4" />
    </svg>
  )
}

export function EmptyOptionsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1}
      {...props}
    >
      <circle cx={7} cy={12} r={2.5} />
      <circle cx={12} cy={7} r={2.5} />
      <circle cx={17} cy={12} r={2.5} />
      <path d="M6 18h12" />
    </svg>
  )
}
