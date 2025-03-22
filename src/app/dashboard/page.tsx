"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSpline, RefreshCcw, UserRoundCheck, UserRoundX, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [totalInscritos, setTotalInscritos] = useState(0);
  const [totalPresentes, setTotalPresentes] = useState(0);
  const [totalAusentes, setTotalAusentes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDashboardCounts() {
    setIsLoading(true)
    const res = await fetch("/api/get-count-data");
    const data = await res.json();
    setTotalInscritos(data.totalInscritos);
    setTotalPresentes(data.totalPresentes);
    setTotalAusentes(data.totalAusentes);
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-2 items-center">
            <ChartSpline/>
            <h1 className="text-2xl font-bold">DASHBOARD</h1>
        </div>
        <button disabled={isLoading} onClick={fetchDashboardCounts} className="btn p-2 border border-gray-400 rounded-full">
            <RefreshCcw/>
        </button>
      </div>

      {/* dashboard wrapper */}
      <div className=" w-full h-max-screen">
        {/* USER COUNT CONTAINER */}
        <div>
          {/* Cards wrapper */}
          <div className="flex flex-col space-y-5">
            {/* TOTAL */}
            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle className="!text-xl !font-extrabold flex flex-row justify-between w-full">
                  <Users />
                  INSCRITOS:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="!text-2xl !font-medium">{totalInscritos}</p>
              </CardContent>
            </Card>
            {/* PRESENTES */}
            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle className="!text-xl !font-extrabold flex flex-row justify-between w-full text-green-500">
                  <UserRoundCheck />
                  PRESENTES:
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-end space-x-1">
                <p className="!text-2xl !font-medium text-green-500">
                  {totalPresentes}
                </p>
                <p>/ {totalInscritos}</p>
              </CardContent>
            </Card>
            {/* AUSENTES */}
            <Card className="w-[200px]">
              <CardHeader>
                <CardTitle className="!text-xl !font-extrabold flex flex-row justify-between w-full text-red-500">
                  <UserRoundX />
                  FALTANTES:
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-row items-end space-x-1">
                <p className="!text-2xl !font-medium text-red-500">
                  {totalAusentes}
                </p>
                <p>/ {totalInscritos}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
