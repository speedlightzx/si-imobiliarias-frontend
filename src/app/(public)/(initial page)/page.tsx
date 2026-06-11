'use client'

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginPage() {

  const router = useRouter()

  return (
    <div className="bg-neutral-200 w-full h-screen flex items-center justify-center">
      <div className="w-[30%]">
        <Card>
          <CardHeader>
            <CardTitle>Fazer login</CardTitle>
            <CardDescription>Seja bem-vindo! Faça login para continuar.</CardDescription>
            <CardAction>
              <Button onClick={() => router.push('/register')} variant={"link"}>Cadastrar-se</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <form id="loginForm" method="post" className="flex flex-col gap-y-5">
              <div className="form">
                <Label className="place-self-center">Email:</Label>
                <Input required type="email" placeholder="email@gmail.com"/>
              </div>
              <div className="form">
                <Label className="place-self-center">Senha:</Label>
                <Input required type="password" placeholder="Insira sua senha"/>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full flex justify-center">
            <Button type="submit" form="loginForm" className="w-[50%] bg-green-500 cursor-hover">Entrar</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}