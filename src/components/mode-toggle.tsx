import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/components/theme-provider"
interface Props {
    variant?: "horizontal"
}

export function ModeToggle({ variant }: Props) {
    const { theme, setTheme } = useTheme()

    return (
        <Button variant="outline" size={variant === "horizontal" ? "default" : "icon"} onClick={
            () => {
                if (theme === "dark") {
                    setTheme("light")
                } else {
                    setTheme("dark")
                }
            }
        }>
            {variant === "horizontal" &&
                <div className="flex items-center gap-2">
                    {theme === "dark" ? <Sun /> : <Moon />}
                    <p>
                        Toggle schema
                    </p>
                </div>}
            {variant !== "horizontal" && <>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
            </>}

        </Button>
    )
}
