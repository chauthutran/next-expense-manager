/** Displays individual expense details with options to edit or delete. */

'use client';

import { IExpense, JSONObject } from '@/libs/definations';
import * as Utils from '@/utils';
import * as AppStore from '@/libs/appStore';
import * as Constant from '@/libs/constants';
import { FaShoppingCart, FaUtensils, FaHome, FaCar } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Alert from '../basics/Alert';
import { useCategory } from '@/contexts/CategoryContext';
import { GiClothes } from 'react-icons/gi';
import { MdOutlineSchool } from 'react-icons/md';
import { FaTheaterMasks } from 'react-icons/fa';
import { PiBowlFoodFill } from 'react-icons/pi';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import { PiHouseLineDuotone } from 'react-icons/pi';
import { GiEarrings } from 'react-icons/gi';
import { GiPiggyBank } from 'react-icons/gi';
import { GiHealthNormal } from 'react-icons/gi';
import { useMainUi } from '@/contexts/MainUiContext';
import Button from '../basics/Button';

export default function ExpenseItem({
    data,
    itemOnShowEditForm,
    itemOnDelete,
}: {
    data: IExpense;
    itemOnShowEditForm: (item: IExpense) => void;
    itemOnDelete: (item: IExpense) => void;
}) {
    // const { setSubPage } = useMainUi();
    const { categoryMap } = useCategory();

    const category = categoryMap[data.category];
    const sanitizedIcon = category.icon.replace(/class=/g, 'className=');

    // const setSelectedExpense = () => {
    //     AppStore.setSelected(data);
    //     setSubPage(Constant.SUB_UI_EDIT_FORM);
    // };

    // const handleOnDelete = () => {
    //     const ok = confirm(
    //         `Are you sure you want to delete this expense ${data.description} ?`
    //     );
    //     if (ok) {
    //         // deleteExpense(data.id!);
    //     }
    // };

    const dateStr = Utils.formatDisplayDateObj(
        Utils.convertDateStrToObj(data.date)
    );

    return (
        <div
            className={`flex items-start space-x-4 p-4 border-b border-gray-100 rounded-lg shadow-sm hover:bg-gray-100 bg-white cursor-pointer`}
        >
            <div className="text-sm font-semibold text-gray-500 w-20">
                {dateStr}
            </div>
            
            <div className="flex flex-1 items-center space-x-2 mb-1">
                <div
                    className="w-6 h-6"
                    dangerouslySetInnerHTML={{
                        __html: sanitizedIcon
                    }}
                />
                <span className="font-medium">
                    {data.description || category?.name}
                </span>
            </div>
            
            <div className="text-gray-700">
                {Utils.formatCurrency(data.amount)}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <Button
                        title="Edit"
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => itemOnShowEditForm(data)}
                    />
                    <Button
                        title="Delete"
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => itemOnDelete(data)}
                    />
                </div>
            </div>
        </div>

        // <>
        //     <div
        //         className="py-3"
        //         // onClick={() => setSelectedExpense()}
        //     >
        //         {dateStr}
        //     </div>

        //     <div className='flex space-x-3 items-center'>
        //         <div
        //             className="w-5 h-5"
        //             dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
        //         />
        //         <div
        //             className=""
        //             // onClick={() => setSelectedExpense()}
        //         >
        //             {data.description || category.name}
        //         </div>
        //     </div>

        //     <div
        //         className="text-right"
        //         // onClick={() => setSelectedExpense()}
        //     >
        //         {Utils.formatCurrency(data.amount)}
        //     </div>

        //     <div className="space-x-3">
        //         <Button
        //             title="Edit"
        //             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        //             onClick={() => itemOnShowEditForm(data)}
        //         />
        //         <Button
        //             title="Delete"
        //             className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        //             onClick={() => itemOnDelete(data)}
        //         />
        //     </div>
        // </>
    );
}
