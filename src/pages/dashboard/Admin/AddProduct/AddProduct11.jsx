import { useState } from 'react'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../../../redux/features/products/productApi';
import { toast } from 'react-toastify';

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

export default function AddProduct() {
    const { user } = useSelector((state) => state.auth);

    const [AddProduct, {isLoading, error}] = useAddProductMutation()
    const [product, setProduct] = useState({
        name: '',
        category: '',
        color: '',
        price: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            const updatedUser = {
                name: product.name,
                category: product.category,
                color: product.color,
                price: product.price,
                description: product.description,
                image: product.image,
            }
            try {
                const response = await AddProduct(updatedUser).unwrap();
                console.log(response)
                toast.success('Profile updated successfully!');
            } catch (error) {
                console.log(error)
            }
        }
    return (
        <div>
            <div className="container mx-auto mt-8">
                <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Image</label>
                    <input
                        type='text'
                        name="image"
                        id="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder='Image'
                        className="add-product-InputCSS"
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
                        >Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
