"use client";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export default function Home({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-screen h-[60px] items-center justify-center gap-10 mt-5">
        <Link href="">
          <h1>Main</h1>
        </Link>
        <Link href="#reserve">
          <h1>Reserve</h1>
        </Link>
        <Link href="#contact">
          <h1>Contact</h1>
        </Link>
      </div>
      <div className="w-[80vw] h-[1px] bg-gray-400 mt-10"></div>
      <div className="w-screen h-[80vh] flex items-center justify-between px-[20vw]">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="max-w-[500px] flex gap-5 flex-col">
          <h1>Hello</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            expedita dolor excepturi quis eius ipsum vitae tempore fugiat, eos
            ab odio porro vel nostrum doloribus aspernatur rem id a numquam.
          </p>
        </div>
      </div>
      <div className="w-[80vw] h-[1px] bg-gray-400"></div>
      <div
        className="w-screen h-auto flex flex-col items-center mt-20"
        id="reserve"
      >
        <h1>Reserve a date</h1>
        <div className="w-[80vw] h-auto mt-20 flex items-center justify-center gap-56">
          <div className="flex flex-col gap-3 w-[400px]">
            <h1>To make a reservation we need aditional info about you</h1>
            <input
              placeholder="Enter your name..."
              required
              value={info.name}
              name="name"
              onChange={(e) =>
                setInfo({
                  ...info,
                  [e?.target.name]: e?.target.value,
                })
              }
            ></input>
            <input
              placeholder="Enter your email..."
              required
              value={info.email}
              name="email"
              onChange={(e) =>
                setInfo({
                  ...info,
                  [e?.target.name]: e?.target.value,
                })
              }
            ></input>
            <input
              placeholder="Enter your phone..."
              required
              value={info.phone}
              name="phone"
              onChange={(e) =>
                setInfo({
                  ...info,
                  [e?.target.name]: e?.target.value,
                })
              }
            ></input>
            <div className="flex items-center gap-5">
              <p>Pick a date</p>
              <div className={cn("grid gap-2", className)}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Button>Reserve</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Info about your reservation
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Your name: {info.name}
                  </AlertDialogDescription>
                  <AlertDialogDescription>
                    Your email: {info.email}
                  </AlertDialogDescription>
                  <AlertDialogDescription>
                    Your phone: {info.phone}
                  </AlertDialogDescription>
                  <AlertDialogDescription>
                    Your dates: {format(date.from, "LLL dd y").toString()}
                    {" - "}
                    {format(date.to, "LLL dd y").toString()}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="w-[80vw] h-[1px] bg-gray-400 mt-20"></div>
      <div
        id="contact"
        className="flex items-center justify-center w-screen h-[80vh] flex-col gap-10"
      >
        <h2 className=" text-5xl"> In case of any questions call us</h2>
        <h2 className=" text-5xl"> 8-800-335-3535</h2>
        <h2 className=" text-5xl"> example@mail.com</h2>
      </div>
      <div className="w-[80vw] h-[1px] bg-gray-400 mt-10"></div>
      <div className="w-screen flex items-center justify-center p-5">
        <p>All rights reserved | Dimasiks&trade;</p>
      </div>
    </div>
  );
}
