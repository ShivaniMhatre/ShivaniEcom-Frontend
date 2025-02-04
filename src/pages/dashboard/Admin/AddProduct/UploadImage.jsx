// import React, { useState } from 'react'

// import axios from 'axios'
// import { getBaseURL } from '../../../../utils/baseURL';

// const UploadImage = ({ name, setImage }) => {
//     const [loading, setLoading] = useState(false);
//     const [url, setUrl] = useState("");

//     // base64 functionality

//     const convertBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(file);

//             fileReader.onload = () => {
//                 resolve(fileReader.result);
//             };

//             fileReader.onerror = (error) => {
//                 reject(error);
//             };
//         });
//     };

//     // request to upload a file
//     // const uploadSingleImage = (base64) => {
//     //     setLoading(true);
//     //     axios
//     //         .post(`${getBaseURL()}/uploadimage`, { image: base64 })
//     //         .then((res) => {
//     //             const imageUrl = res.data;
//     //             setUrl(imageUrl);
//     //             // console.log(imageUrl);
//     //             alert("Image uploaded successfully");
//     //             setImage(imageUrl); 
//     //         })
//     //         .then(() => setLoading(false))
//     //         .catch((error) => {
//     //             console.error(error);
//     //             setLoading(false);
//     //         });
//     // };

//     const uploadSingleImage = (base64) => {
//         setLoading(true);
//         axios.post(`${getBaseURL()}/uploadimage`, { image: base64 })
//             .then((res) => {
//                 const imageUrl = res.data.imageUrl;
//                 setUrl(imageUrl);
//                 alert("Image uploaded successfully");
//                 setImage(imageUrl);
//             })
//             .catch((error) => {
//                 console.error("Axios Error:", error);
//                 if (error.response) {
//                     console.error("Server Response Data:", error.response.data);
//                     console.error("Server Response Status:", error.response.status);
//                 } else {
//                     console.error("No Response from Server");
//                 }
//             })
//             .finally(() => setLoading(false));
//     };
    
    
    

//     const uploadImage = async (event) => {
//         const files = event.target.files;

//         if (files.length === 1) {
//             const base64 = await convertBase64(files[0]);
//             uploadSingleImage(base64);
//             return;
//         }

//         const base64s = [];
//         for (let i = 0; i < files.length; i++) {
//             const base = await convertBase64(files[i]);
//             base64s.push(base);
//         }
//     }


//     return (
//         <div>
//             <label htmlFor={name}>Upload Image</label>
//             <input type="file"
//                 name={name}
//                 id={name}
//                 onChange={uploadImage}
//                 className='add-product-InputCSS' />
//             {
//                 loading && (
//                     <div className='mt-2 text-sm text-blue-600'>Product uploading...</div>
//                 )
//             }
//             {
//                 url && (
//                     <div className='mt-2 text-sm text-green-600'>
//                         <p>Image uploaded successfully!</p>
//                         <img src={url} alt="uploaded-image" />
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default UploadImage


import React, { useState } from 'react';
import axios from 'axios';
import { getBaseURL } from '../../../../utils/baseURL';  // Ensure your base URL is correct

const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    // Convert image to base64 string
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Upload image to the backend
    const uploadSingleImage = (base64) => {
        setLoading(true);
        axios.post(`${getBaseURL()}/uploadimage`, { image: base64 })
            .then((res) => {
                const imageUrl = res.data.imageUrl;
                setUrl(imageUrl);
                alert("Image uploaded successfully");
                setImage(imageUrl);
            })
            .catch((error) => {
                console.error("Axios Error:", error);
                if (error.response) {
                    console.error("Server Response Data:", error.response.data);
                    console.error("Server Response Status:", error.response.status);
                } else {
                    console.error("No Response from Server");
                }
            })
            .finally(() => setLoading(false));
    };

    // Handle image file upload
    const uploadImage = async (event) => {
        const files = event.target.files;
        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            const base = await convertBase64(files[i]);
            base64s.push(base);
        }
    };

    return (
        <div>
            <label htmlFor={name}>Upload Image</label>
            <input type="file"
                name={name}
                id={name}
                onChange={uploadImage}
                className='add-product-InputCSS' />
            {
                loading && (
                    <div className='mt-2 text-sm text-blue-600'>Product uploading...</div>
                )
            }
            {
                url && (
                    <div className='mt-2 text-sm text-green-600'>
                        <p>Image uploaded successfully!</p>
                        <img src={url} alt="uploaded-image" />
                    </div>
                )
            }
        </div>
    );
};

export default UploadImage;
