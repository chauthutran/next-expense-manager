import { IViewChartOption, JSONObject } from '@/libs/definations';
import { capitalizeFirstLetter } from '@/libs/utils';
import { useState } from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

export default function ViewChartOptionsForm({
    config,
    selected = {} as IViewChartOption,
    onItemClick
}: {
    config: JSONObject;
    selected?: IViewChartOption;
    onItemClick: (selection: IViewChartOption) => void;
}) {
    const selectedType =
        selected.type || (config.types[0] as IViewChartOption['type']);
    const selectedViewMode =
        selected.viewMode ||
        (config.viewModes?.[0] as IViewChartOption['viewMode']);
        
    const handleTypeClick = (type: IViewChartOption['type']) => {
        const viewMode = config.viewModes?.[0] as IViewChartOption['viewMode'];
        onItemClick({ type, viewMode });
    };

    const handleViewModeClick = (type: IViewChartOption['type'], viewMode: IViewChartOption['viewMode']) => {
        onItemClick({ type, viewMode });
    };

    return (
        <>
            {config.viewOptions.map((option: JSONObject) => {
                const type = option.type;
                const viewModes = option.viewModes;

                return (
                    <>
                        <div
                            key={`type_${type}`}
                            className={`cursor-pointer rounded-lg border py-2 px-3 ${
                                selectedType === type && 'bg-blue-200'
                            }`}
                            onClick={() =>
                                handleTypeClick(
                                    type as IViewChartOption['type']
                                )
                            }
                        >
                            {capitalizeFirstLetter(type)}
                        </div>

                        {viewModes && (
                            <div>
                                <IoMdArrowDropright />
                            </div>
                        )}
                        {viewModes?.map((mode: string) => (
                            <div className="text-justify text-sm" key={`mode_${mode}`}>
                                <div
                                    className={`cursor-pointer rounded-lg border py-2 px-3 ${
                                        selectedViewMode === mode &&
                                        'bg-blue-200'
                                    }`}
                                    onClick={() =>
                                        handleViewModeClick(
                                            type as IViewChartOption['type'],
                                            mode as IViewChartOption['viewMode']
                                        )
                                    }
                                >
                                    {capitalizeFirstLetter(mode)}
                                </div>
                            </div>
                        ))}
                    </>
                );
            })}
        </>
    );
}
