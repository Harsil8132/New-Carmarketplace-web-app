import { carImages, carListing } from '../schema/index'
import {db} from '../../../dbconfigs/index'
import { and, desc, eq, lt, lte, or } from 'drizzle-orm'
import { deleteImageFromCloudinary } from './cloudinaryServices'

const formatResult = (resp) => {
    let result = []
    let finalResult = []

    resp.forEach((item) => {
        const listinId = item.carListing?.id
        if(!result[listinId]){
            result[listinId] = {
                car: item.carListing,
                images: []
            }
        }

        if(item.carImages){
            result[listinId].images.push(item.carImages)
        }
    })

    result.forEach((item) => {
        finalResult.push({
            ...item.car,
            images: item.images
        })
    })

    return finalResult
}

export const uploadListing = async(values) => {
    try {
        return await db.insert(carListing).values(values).returning({carListing});
    } catch (error) {
        console.log("ERROR :: uploadListing :", error);
    }
}

export const getUserListing = async (userId) => {
    try {
        return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(eq(carListing.createdBy, userId))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
    } catch (error) {
        console.log("ERROR :: getUserListing :", error);
    }
}

export const getAllListing = async () => {
    try {
        console.log("Fetching all listings...");
        const result = await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .orderBy(desc(carListing.id))
                            .then((res) => {
                                console.log("Raw database result:", res);
                                return formatResult(res);
                            });
        console.log("Formatted result:", result);
        return result;
    } catch (error) {
        console.log("ERROR :: getAllListing :", error);
        throw error;
    }
}

export const getListingById = async (id) => {
    try {
        return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(eq(carListing.id, id))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
    } catch (error) {
        console.log("ERROR :: getListingById :", error);
    }
}

export const getListingByCategory = async (category) => {
    try {
        return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(eq(carListing.category, category))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
    } catch (error) {
        console.log("ERROR :: getListingById :", error);
    }
}

export const getListingByOptions = async (condition, brand, sellingPrice) => {
    
    try {
        if(!(condition == "null") && brand == "null" && sellingPrice == "null"){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(eq(carListing.condition, condition))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(!(brand== "null") && condition== "null" && sellingPrice== "null"){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(eq(carListing.brand, brand))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(!(sellingPrice== "null") && condition== "null" && brand== "null"){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(lte(carListing.sellingPrice, sellingPrice))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(!(sellingPrice== "null") && !(condition== "null") && brand== "null"){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.condition, condition),
                                lte(carListing.sellingPrice, sellingPrice)
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(!(sellingPrice== "null") && condition== "null" && !(brand== "null")){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.brand, brand),
                                lte(carListing.sellingPrice, sellingPrice)
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(sellingPrice== "null" && !(condition== "null") && !(brand== "null")){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.condition, condition),
                                eq(carListing.brand, brand),
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(!(sellingPrice== "null") && !(condition== "null") && brand== "null"){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.condition, condition),
                                lte(carListing.sellingPrice, sellingPrice)
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(!(sellingPrice== "null") && condition== "null" && !(brand== "null")){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.brand, brand),
                                lte(carListing.sellingPrice, sellingPrice)
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else if(sellingPrice== "null" && !(condition== "null") && !(brand== "null")){
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.condition, condition),
                                eq(carListing.brand, brand),
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }else{
            return await db.select().from(carListing)
                            .leftJoin(carImages, eq(carListing.id, carImages.carListingId))
                            .where(and(
                                eq(carListing.condition, condition),
                                eq(carListing.brand, brand),
                                lte(carListing.sellingPrice, sellingPrice)
                            ))
                            .orderBy(desc(carListing.id))
                            .then((res) => formatResult(res))
        }
        
    } catch (error) {
        console.log("ERROR :: getListingById :", error);
        return error
    }
}

export const updateListing = async (id, values) => {
    try {
        return await db.update(carListing).set(values)
                        .where(eq(carListing.id, id))
                        .returning({carListing})
    } catch (error) {
        console.log("ERROR :: updateListing :", error);
    }
}



export const deleteImage = async (image) => {
    try {
        const result = await db.delete(carImages).where(eq(carImages.id, image.id)).returning({carImages})
        if(result){
            deleteImageFromCloudinary(image.imageUrl)
        }
    } catch (error) {
        console.log("ERROR :: deleteImage :", error);
    }
}

export const deleteListing = async (carDetails) => {
    try {
        carDetails.images.map((image) => (
            deleteImage(image)
        ))
        
        const result = await db.delete(carListing).where(eq(carListing.id, carDetails.id))
    } catch (error) {
        
    }
}