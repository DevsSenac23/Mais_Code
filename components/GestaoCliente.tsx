"use client"

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PopupConfirmacao from "@/components/PopUpConfirmacao";


export default function GestaoCliente() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[375px] shadow-xl">
        <CardHeader>
          <CardTitle>Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center ">
            <img
              className="w-20 h-20 opacity-40"
              src={'/icons/icon-empresa.png'}
              alt="Imagem"
            />
          </div>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name"></Label>
                <Input className='rounded-none opacity-40' id="name" placeholder="Nome" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cpf"></Label>
                <Input className='rounded-none opacity-40' id="cpf" placeholder="CNPJ/CPF" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email"></Label>
                <Input className='rounded-none opacity-40' id="email" placeholder="Email" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address"></Label>
                <Input className='rounded-none opacity-40' id="address" placeholder="Endereço" style={{ border: 'none', borderBottom: '1px solid #000' }} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center ">
          <PopupConfirmacao />
        </CardFooter>
      </Card>
    </div>
  );
}

