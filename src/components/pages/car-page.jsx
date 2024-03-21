/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PI95FZSl6vl
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { LinkBar } from "../common-elements/link-bar"

export default function CarPage() {
  return (
    <div key="1" className="flex flex-col min-h-[100dvh]">
      <LinkBar/>
      <main className="flex-1">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6">
          <div className="relative group overflow-hidden rounded-lg">
            <Link className="absolute inset-0 z-10" href="#">
              <span className="sr-only">View</span>
            </Link>
            <img
              alt="Car Image"
              className="object-cover w-full h-60"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Car Model</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Description of the car</p>
              <h4 className="font-semibold text-base md:text-lg">$Price</h4>
            </div>
          </div>
        </section>
        <div className="fixed bottom-4 right-4 z-50">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full" size="icon" variant="outline">
                <UserIcon className="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Card className="shadow-none border-0">
                <CardHeader className="border-b">
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to log in.</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" required type="text" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" required type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Login</Button>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
