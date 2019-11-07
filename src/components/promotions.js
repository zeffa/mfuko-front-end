import React from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import moment from 'moment'
import storage from './Firebase'
import '../App.css';

class Promotion extends React.Component {

    state = {
        success: false,
        categories: [],
        sellers: [],
        name: '',
        uniqueCode: '',
        category: '',
        seller: '',
        validBranch: '',
        startDate: '',
        endDate: '',
        regularPrice: '',
        offerPrice: '',
        bundledOffer: '',
        savings: '',
        disclaimer: '',
        filename: null,
        image: null,
        progress: 0,
    }

    onSubmit = (e) => {
        e.preventDefault()
        axios.post('https://mfuko-api.herokuapp.com/promotions', this.formatFormData(this.state))
            .then(result => {
                console.log(result)
                if (result) {
                    this.setState({ success: true })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    formatData = (values, url) => {
        return {
            name: values.name,
            uniqueCode: values.uniqueCode,
            category: values.category,
            seller: values.seller,
            validBranch:values.validBranch,
            startDate:moment(values.startDate, 'YYYY-MM-DD').unix(),
            endDate: moment(values.endDate, 'YYYY-MM-DD').unix(),
            regularPrice:values.regularPrice,
            offerPrice: values.offerPrice,
            bundledOffer:values.bundledOffer,
            savings: values.savings,
            discalimer:values.disclaimer,
            imageUrl: url
        }
    }

    // formatFormData = (values) => {
    //     const formData = new FormData()
    //     formData.append('name', values.name)
    //     formData.append("uniqueCode", values.uniqueCode)
    //     formData.append("category", values.category)
    //     formData.append("seller", values.seller)
    //     formData.append("validBranch", values.validBranch)
    //     formData.append("startDate", moment(values.startDate, 'YYYY-MM-DD').unix())
    //     formData.append("endDate", moment(values.endDate, 'YYYY-MM-DD').unix())
    //     formData.append("regularPrice", values.regularPrice)
    //     formData.append("offerPrice", values.offerPrice)
    //     formData.append("bundledOffer", values.bundledOffer)
    //     formData.append("savings", values.savings)
    //     formData.append("discalimer", values.disclaimer)
    //     formData.append("file", values.filename)

    //     return formData
    // }

    handleUpload = (e) => {
        e.preventDefault()
        this.setState({...this.state, progress:0, success: false})
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ ...this.state, progress });
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        axios.post('https://mfuko-api.herokuapp.com/promotions', this.formatData(this.state, url))
                            .then(result => {
                                this.setState({ ...this.state, url, success: true });
                            }).catch(error => {
                                console.log(error)
                                this.setState({ ...this.state, success: false });
                            })
                    });
            })
    }

    handleFile = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.files[0], image: e.target.files[0] })
    }

    onChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    sellerOptions = this.state.sellers.map((data) =>
        <option
            key={data._id}
            value={data._id}>
            {data.name}
        </option>
    );

    categoryOptions = this.state.categories.map((data) =>
        <option
            key={data._id}
            value={data._id}>
            {data.name}
        </option>
    );

    render() {

        let categoryOptions = this.state.categories.map((data) =>
            <option
                key={data._id}
                value={data._id}>
                {data.name}
            </option>
        );

        let sellerOptions = this.state.sellers.map((data) =>
            <option
                key={data._id}
                value={data._id}>
                {data.name}
            </option>
        );

        const { onChange } = this;
        return (
            <div className='App'>
                <header className='App-header'>
                    <div>
                        {
                            this.state.success && <div style={{ marginBottom: '10px' }}>Created Successfully</div>
                        }
                        <div style={{ marginBottom: '10px' }}>Create Promotion</div>
                        <form onSubmit={this.handleUpload}>
                            <input value={this.state.name} onChange={onChange} type='text' name='name' placeholder='Promotion name' /><br />
                            <select value={this.state.category} onChange={onChange} name='category'>
                                <option>Select Category</option>
                                {categoryOptions}
                            </select><br />
                            <select value={this.state.seller} onChange={onChange} name='seller'>
                                <option>Select Outlet</option>
                                {sellerOptions}
                            </select><br />
                            <input value={this.state.uniqueCode} onChange={onChange} type='text' name='uniqueCode' placeholder='Unique Code' /><br />
                            <input value={this.state.validBranch} onChange={onChange} type='text' name='validBranch' placeholder='Valid Branch' /><br />
                            <input value={this.state.startDate} onChange={onChange} type='date' name='startDate' placeholder='Start Date' /><br />
                            <input value={this.state.endDate} onChange={onChange} type='date' name='endDate' placeholder='End Date' /><br />
                            <input value={this.state.regularPrice} onChange={onChange} type='number' name='regularPrice' placeholder='Regular Price' /><br />
                            <input value={this.state.offerPrice} onChange={onChange} type='text' name='offerPrice' placeholder='Offer Price' /><br />
                            <input value={this.state.bundledOffer} onChange={onChange} type='text' name='bundledOffer' placeholder='Bundled Offer' /><br />
                            <input value={this.state.savings} onChange={onChange} type='text' name='savings' placeholder='Savings' /><br />
                            <input value={this.state.disclaimer} onChange={onChange} type='text' name='disclaimer' placeholder='Disclaimer' /><br />
                            <input onChange={this.handleFile} accept='image/*' type='file' name='filename' /><br />
                            <input type='submit' value='Create Promotion' />
                        </form>
                    </div>
                </header>
            </div>
        );
    }

    componentDidMount() {
        this.fetchCategories();
        this.fetchSellers();
    }

    fetchCategories = () => {
        axios.get('https://mfuko-api.herokuapp.com/categories')
            .then(categories => {
                this.setState({ categories: categories.data })
            })
            .catch(error => { console.log(error) })
    }

    fetchSellers = () => {
        axios.get('https://mfuko-api.herokuapp.com/outlets')
            .then(sellers => {
                this.setState({ sellers: sellers.data })
            })
            .catch(error => { console.log(error) })
    }
}

export default Promotion