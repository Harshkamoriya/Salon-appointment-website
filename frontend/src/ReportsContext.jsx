import { createContext  , useContext, useState} from "react";
const  ReportContext = createContext();

 export const ReportProvider =({Children})=>{
    const [ reportData , setReportData] = useState({
        dailyRevenue :[],
        weeklyRevenue:[],
        monthlyRevenue:[],

        dailyAppointments:[],
        weeklyAppointments:[],
        monthlyAppointments:[],

        dailyCustomers:[],
        weeklyCustomers:[],
        monthlyCustomers:[],

    });

    return (
        <ReportContext.Provider value ={{ reportData , setReportData}} >
            {Children}
            </ReportContext.Provider>

    );
};
export const useReportData = () => useContext(ReportContext);

