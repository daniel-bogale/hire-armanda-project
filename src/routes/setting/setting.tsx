
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { setUser, useAppState } from "@/state"
import { Link, useNavigate } from "react-router-dom"
import { DeleteAccountDialog } from "../auth/delete-modal"
import { deleteUser } from "@/services/userService"

interface Props {

}

const Setting = ({ }: Props) => {
  const { dispatch, state } = useAppState();
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    console.log("logging out");
    try {
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
      if (!state.user?.id) return;
      await deleteUser(
        state.user.id
      );
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
            Manage your account settings below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Link to="/login" onClick={handleLogout} >
              <Button variant="link" className="text-gray-900 dark:text-gray-300 w-full">Log out</Button>
            </Link>
            <ModeToggle variant="horizontal" />
            <DeleteAccountDialog onContine={() => {
              handleDeleteAccount()
              navigate("/")
            }} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Setting