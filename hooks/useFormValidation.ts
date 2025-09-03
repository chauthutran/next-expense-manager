import { JSONObject } from './../libs/definations';
import Joi from 'joi';
import { useState } from 'react';

export default function useFormValidation<T extends object>(
    validationSchema: Joi.ObjectSchema<T>
) {
    const [errors, setErrors] = useState<JSONObject>({});

    // Validate entire form
    const validateForm = (data: T): boolean => {
        const { error } = validationSchema.validate(data, {
            abortEarly: false
        });
        if (error) {
            const newErrors: JSONObject = {};
            error.details.forEach((err: JSONObject) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);

            return false;
        }

        setErrors({});
        return true;
    };

    // Validate single field
    // const validateField = (fieldName: keyof T, value: any): boolean => {
    //     if(!(validationSchema as any).extract) {
    //         throw new Error("Schema must be build with Joi.object().keys()");
    //     }

    //     const fieldSchema = (validationSchema as any).extract(fieldName);
    //     const { error } = fieldSchema.validate(value, {abortEarly: true});
    //     const errorMsg = error ? error.details[0].message : null;

    //     if(errorMsg) {
    //          setErrors({[fieldName]: errorMsg});
    //          return false;
    //     }

    //     setErrors({});
    //     return true;
    // }
    const validateField = (fieldName: keyof T, value: any): boolean => {
        const fieldSchema = (validationSchema as any).describe().keys?.[
            fieldName
        ];
        if (!fieldSchema) throw new Error(`Field ${fieldName.toString()} not in schema`);

        const singleSchema = Joi.object({
            [fieldName]: (validationSchema as any).extract
                ? (validationSchema as any).extract(fieldName)
                : validationSchema.$_terms.keys.find(
                      (k: any) => k.key === fieldName
                  ).schema
        });

        const { error } = singleSchema.validate({ [fieldName]: value });

        if( error ) {
            setErrors({[fieldName]: error.details[0].message});
            return false;
        }
        
        setErrors({});
        return true;
    };

    return { errors, validateForm, validateField };
}
