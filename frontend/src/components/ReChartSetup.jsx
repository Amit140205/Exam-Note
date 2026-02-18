import React from 'react'
import {Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

function ReChartSetup({charts}) {
  const colors=["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"]
  return (
    <div className='spcae-y-8'>
        {charts?.map((chart, index)=>(
          <div key={index}
          className='border border-gray-200 rounded-xl p-4 bg-white'
          >
            <h4 className='font-semibold text-gray-800 mb-3'>
              📊 {chart?.title}
            </h4>
            
            <div className='h-72'>
              <ResponsiveContainer width="100%" height="100%">
                {/* bar chart */}
                  {chart?.type==="bar" && (
                    <BarChart data={chart?.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <Tooltip/>
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {chart?.data?.map((_, index)=>(
                            <Cell key={index} fill={colors[index%colors.length]}/>
                          ))}
                      </Bar>
                    </BarChart>
                  )}

                  {/* line chart */}
                  {chart?.type==="line" && (
                    <LineChart
                    dataKey={chart?.data}
                    >
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <Tooltip/>
                      <Line type="monotone" dataKey="value" stroke='#6366f1'
                      strokeWidth={3}/>
                    </LineChart>
                  )}

                  {/* pie chart */}
                  {chart?.type==="pie" && (
                    <PieChart>
                      <Tooltip/>
                      <Pie
                      data={chart?.data}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                      >
                        {chart?.data?.map((_, index)=>(
                          <Cell key={index} fill={colors[index%colors.length]}/>
                        ))}
                      </Pie>
                    </PieChart>
                  )}
              </ResponsiveContainer>
            </div>

          </div>
        ))}
    </div>
  )
}

export default ReChartSetup