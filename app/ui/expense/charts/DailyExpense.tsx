'use client'


import { useCategory } from "@/contexts/CategoryContext";
import { JSONObject } from "@/lib/definations";
import { Calendar } from "nextjs-jc-component-libs/dist/components";
import * as Utils from "@/lib/utils";
import { EventType } from "nextjs-jc-component-libs/dist/libs/definations";


export default function DailyExpense({startDate, data}: {startDate: Date, data: JSONObject[]}) {
    
	const { categoryList } = useCategory();

    const transformData = (): EventType[] => {
        let events: EventType[] = [];
        for( var i = 0; i<data.length; i++ ) {
            const item = data[i];
            const event = {
                title: Utils.findItemFromList(categoryList!, item.categoryId, "_id")!.name,
                start: new Date(item.date), // YYYY, MM, DD, HH, MM
                end: new Date(item.date),
                color: "#ff00ff"
            };

            events.push(event);
        }

        return events;
    }

    const events = transformData();

    // const events = [
    //     {
    //         title: 'Meeting with Bob',
    //         start: new Date(2024, 7, 15, 10, 0), // YYYY, MM, DD, HH, MM
    //         end: new Date(2024, 7, 15, 11, 0),
    //         color: "#ff00ff"
    //     },
    //     {
    //         title: 'Dinner with Honey',
    //         start: new Date(2024, 7, 15, 20, 0), // YYYY, MM, DD, HH, MM
    //         end: new Date(2024, 7, 15, 20, 0),
    //         color: "#ff0f0f"
    //     },
    //     {
    //         title: 'Lunch with Alice',
    //         start: new Date(2024, 7, 16, 12, 0),
    //         end: new Date(2024, 7, 16, 13, 0)
    //     }
    // ]

    return (
        <div >
            <Calendar events={events} initMonth={startDate.getMonth() + 1} initYear={startDate.getFullYear()} />		
        </div>
    );
}
