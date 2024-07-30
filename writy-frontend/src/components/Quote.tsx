export default function Quote() {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-muted dark:bg-background">
        <div className="max-w-md space-y-4 p-6 md:p-12">
          <blockquote className="text-lg font-semibold leading-snug md:text-xl md:leading-normal text-foreground dark:text-primary-foreground">
            &ldquo;The true sign of intelligence is not knowledge but imagination.&rdquo;
          </blockquote>
          <div className="text-muted-foreground dark:text-primary">
            <span className="font-medium">- Albert Einstein</span>
          </div>
        </div>
      </div>
    )
  }