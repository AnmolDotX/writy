import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex-1 bg-background p-8 flex flex-col justify-center items-center space-y-6">
        <div className="space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Writy</div>
          <h1 className="text-4xl max-w-6xl font-bold tracking-tighter sm:text-6xl">&quot;The bitterest tears shed over graves are for words left unsaid and deeds left undone&quot;</h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed">
            Unleash your creativity and share your unique voice with the world. Our blogging platform empowers you to
            inspire, educate, and connect with your audience.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Effortless Writing</h3>
            <p className="text-muted-foreground">Focus on your content, we handle the rest.</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold">Minimalistic Ambience</h3>
            <p className="text-muted-foreground">Stunning templates to make your blog shine.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Enter into Writy</h3>
          <p className="text-primary animate-pulse">You will have to <span className="text-green-600">signup/login</span> to read or write in community</p>
        </div>
        <Link
          href="/publicRoute/signup"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-black hover:shadow-md duration-300 transition-all hover:shadow-black shadow-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          Signup / Signin
        </Link>
      </div>
    </div>
  )
}