'use client'

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { toast } from "sonner";

export default function LoginPage() {

  const router = useRouter()

  const submitRegisterForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password
        })
      })

      if(!res.ok) {
        const errorData = await res.json()
        toast.error(errorData.message)
        return
      }

      toast.success('Cadastro realizado com sucesso. Faça login para continuar.')
      router.push('/')
    } catch(e) {
      toast.error('Algum erro inesperado aconteceu...')
    }
  }

  return (
    <div className="bg-neutral-200 w-full h-screen flex items-center justify-center">
      <div className="w-[30%]">
        <Card>
          <CardHeader>
            <CardTitle>Fazer cadastro</CardTitle>
            <CardDescription>Seja bem-vindo! Crie sua conta e acesse!</CardDescription>
            <CardAction>
              <Button onClick={() => router.push('/')} variant={"link"}>Fazer login</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <form onSubmit={submitRegisterForm} id="registerForm" method="post" className="flex flex-col gap-y-5">
              <div className="form">
                <Label className="place-self-center">Email:</Label>
                <Input required type="email" name="email" placeholder="email@gmail.com"/>
              </div>
              <div className="form">
                <Label className="place-self-center">Senha:</Label>
                <Input required type="password" name="password" placeholder="Insira sua senha"/>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <Button type="submit" form="registerForm" className="w-[50%] bg-green-500 cursor-hover">Cadastrar-se</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}