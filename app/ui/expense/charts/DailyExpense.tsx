'use client'


import { useCategory } from "@/contexts/CategoryContext";
import { JSONObject } from "@/lib/definations";
import { Calendar } from "nextjs-jc-component-libs/dist/components";
import * as Utils from "@/lib/utils";
import { EventType } from "nextjs-jc-component-libs/dist/libs/definations";
import { useEffect, useState } from "react";
import Modal from "@/ui/basics/Modal";
import ExpenseItem from "../ExpenseItem";

const categoryColors: Record<string, string> = {
	'Utilities': "#FFD700",
	'Groceries': "#FFA07A",
	'Entertainment': "#9370DB",
	'Transportation': "#20B2AA",
	'Dining Out': "#FF4500",
	'Rent/Mortgage': "#4682B4",
	'Health & Wellness': "#32CD32",
	'Education': "#8A2BE2",
	'Clothing & Accessories': "#FF69B4",
	'Savings & Investments': "#2E8B57"
};


export default function DailyExpense({startDate, data}: {startDate: Date, data: JSONObject[]}) {
    
	const { categoryList } = useCategory();
    const [detailsEvents, setDetailsEvents] = useState<JSONObject[]>([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(()=> {

    },[data, startDate]);

    const transformData = (): EventType[] => {
        let events: EventType[] = [];
        for( var i = 0; i<data.length; i++ ) {
            const item = data[i];
            const category = Utils.findItemFromList(categoryList!, item.categoryId, "_id")!;
            const event: EventType = {
                title: `${category.name} - ${item.description}`,
                start: new Date(item.date), // YYYY, MM, DD, HH, MM
                end: new Date(item.date),
                color: categoryColors[category.name]
            };

            events.push(event);
        }

        return events;
    }

    const showExpenseList = (date: Date) => {
        console.log(date ); 
        const dateStr = Utils.formatDateObjToDbDate(date).substring(0,10); // Get the date only, remove the time stamp
		let filteredList = data.filter((item) => {
			if ( item.date.substring(0,10) === dateStr ) {
				return true;
			}
			return false;
		});

        filteredList = filteredList === undefined ? [] : Utils.sortArrayByDate(filteredList);
        setDetailsEvents( filteredList );
        setShowDetails(true);
	}


    const events = transformData();

    return (
        <>
            <div> 
                <Calendar events={events} initMonth={startDate.getMonth() + 1} initYear={startDate.getFullYear()} onClick={(date: Date) => showExpenseList(date)} />
            </div>

            <Modal isVisible={showDetails} onClose={() => setShowDetails(false)}>
                <div className="bg-white">
                    {detailsEvents.map((expense, index) => (
                        <ExpenseItem style="small" key={expense._id} data={expense} index={index} />
                    ))}
                </div>
            </Modal>
        </>
    );
}
