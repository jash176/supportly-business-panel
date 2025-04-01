import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useWorkspace } from '@/context/WorkspaceContext'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PencilIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useAuth } from '@/context/auth'
import { useAddAgent } from '@/hooks/useAddAgent'
import { toast } from '@/hooks/use-toast'

const AgentsAndTeams = () => {
  const {user} = useAuth()
  const { workspaceData } = useWorkspace()
  const {mutateAsync: addAgent, isPending: isAddingAgent} = useAddAgent()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please provide both email and password",
        variant: "destructive"
      });
      return;
    }
    try {
      const response = await addAgent({
        email,
        password,
        name
      })

      if(response.success) {
        toast({
          title: "Success",
          description: "Agent added successfully",
        });
      }
      
      // Close dialog and reset form
      setIsOpen(false);
      setEmail('');
      setName('');
      setPassword('');
    } catch (error: any) {
      console.error("Error adding agent:", error);
      toast({
        title: "Error adding agent",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive"
      });
    }
  }

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  // Assuming workspaceData.currentUser contains the ID of the current user
  const currentUserId = user?.id;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Agents & Teams</h2>
            <p className="text-sm text-gray-500">Manage your team members and their permissions</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>Add Agent</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Agent</DialogTitle>
                <DialogDescription>
                  Create a new agent account by providing their email and password.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                    id="name"
                    placeholder="Name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isAddingAgent}>{isAddingAgent ? "Adding..." : "Add Agent"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="p-6">
        {!workspaceData?.workspace?.Agents || workspaceData?.workspace.Agents.length === 0 ? (
          <p className="text-gray-500 text-center">No agents added yet</p>
        ) : (
          <div className="space-y-4">
            {workspaceData.workspace.Agents.map((agent: any) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                    <AvatarFallback>{getInitials(agent.name || agent.email)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{agent.name}</h3>
                      {agent.id === currentUserId && (
                        <span className="ml-2 text-sm text-gray-500">(You)</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-xs">
                    {agent.role}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AgentsAndTeams