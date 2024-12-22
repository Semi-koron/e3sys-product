"use client";
import { useState } from "react";
import MenuButton from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function Home() {
  const [name, setName] = useState("");
  return (
    <div className="bg-orange-500 min-h-screen p-8">
      <div className="flex justify-between items-center mb-4">
        <MenuButton />
        <div className="flex-1 flex justify-center">
          <Header />
        </div>
      </div>
      <main>
        <Section title="プロフィール" className="flex flex-col gap-4 mb-6">
          <Input
            title="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button>保存</Button>
        </Section>
      </main>
    </div>
  );
}
