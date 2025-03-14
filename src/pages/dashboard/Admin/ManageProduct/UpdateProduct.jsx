import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TextInput from '../AddProduct/TextInput';
import UploadImage from '../AddProduct/UploadImage';
import SelectInput from '../AddProduct/SelectInput';


const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Dress', value: 'dress' },
    { label: 'Jewellery', value: 'jewellery' },
    { label: 'Cosmetics', value: 'cosmetics' }
];

const colors = [
    { label: 'Select Color', value: '' },
    { label: 'Black', value: 'black' },
    { label: 'Red', value: 'red' },
    { label: 'Gold', value: 'gold' },
    { label: 'Blue', value: 'blue' },
    { label: 'Silver', value: 'silver' },
    { label: 'Beige', value: 'beige' },
    { label: 'Green', value: 'green' }
];
export default function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth) 
    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: ''
    })
    const { data: productData, isLoading: isProductLoading, error: fetchError, refetch } = useFetchProductByIdQuery(id);
    const [newImage, setNewImage] = useState(null);
    const { name, category, color, description, image: imageURL, price } = productData?.product || {};

    const [updateProduct, { isLoading:isUpdating, error: updateError }] = useUpdateProductMutation();
    console.log(productData?.product)

    useEffect(() => {
        if (productData) {
            setProduct({
                name: name || '',
                category: category || '',
                color: color || '',
                price: price || '',
                description: description || '',
                image: imageURL || ''
            })
        }
    }, [productData])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleImageChange = (image) => {
        setNewImage(image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...product,
            image: newImage ? newImage : product.image,
            autor: user?._id
        }
        try {
            await updateProduct({ id: id, ...updatedProduct }).unwrap()
            toast.success('Product updated successfully')
            await refetch()
            navigate('/dashboard/manage-products')
        } catch (error) {
            toast.error('Failed to update product:', error)
        }
    }

    if (isProductLoading) return <div>Loading...</div>
    if (fetchError) return <div>Error fetching product....</div>
    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Update Product</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                <SelectInput
                    label="Color"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />
                <TextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />

                <UploadImage
                    name="image"
                    id="image"
                    value={newImage || product.image}
                    placeholder='Image'
                    setImage={handleImageChange}
                />
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea name="description" id="description"
                        className='add-product-InputCSS'
                        value={product.description}
                        placeholder='Write a product description'
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div>
                    <button type='submit'
                        className='add-product-btn'

                    >{isUpdating?'Updating....':'Update Product'}</button>
                </div>
            </form>
        </div>
    )
}
