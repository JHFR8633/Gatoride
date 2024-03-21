import Link from "next/link"

export function LinkBar({ links = ["Cars", "About", "Contact"] }) {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Branding/>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Links/>
            </nav>
        </header>
    )
}

const Links = ({linkList = ["Cars", "About", "Contact"]}) => {
    const generateLink = (link) => {
        if (typeof link != 'string') return null;
        
        return (
            <Link className="text-sm font-medium hover:underline underline-offset-4" href={link.toLowerCase()}> 
                {link}
            </Link>
        );
    }

    return linkList.map((link) => generateLink(link))
}

const Branding = () => {
    return (
        <Link className="flex items-center" href="/">
            <Logo className="h-6 w-6" />
            <span className="font-semibold text-xl ml-2"> Gatoride </span>
        </Link>
    )
}

function Logo(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>)
    );
  }