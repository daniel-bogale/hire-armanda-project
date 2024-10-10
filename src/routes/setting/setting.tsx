
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { deleteAccount, logout } from "@/services/authService"
import { setUser, useAppState } from "@/state"
import { Link } from "react-router-dom"

interface Props {

}

const Setting = ({ }: Props) => {
  const { dispatch } = useAppState();
  const { toast } = useToast()

  const handleLogout = async () => {
    console.log("logging out");
    try {
      await logout();
      dispatch(setUser(null));
    }
    catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  }
  const handleDeleteAccount = async () => {
    console.log("deleting");
    try {
      await deleteAccount();
      dispatch(setUser(null));
    }
    catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }
  }




  return (
    <div className="container mx-auto flex items-center justify-center min-h-[70vh]">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Setting</CardTitle>
          <CardDescription>
            Manage your account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Link to="/login" onClick={handleLogout} >
              <Button variant="link" className="text-gray-900 dark:text-gray-300 w-full">Log out</Button>
            </Link>
            <ModeToggle variant="horizontal" />
            <Link to="/" onClick={handleDeleteAccount} >
              <Button variant="destructive" className="text-gray-900 dark:text-gray-300 w-full ">Delete Account</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Setting