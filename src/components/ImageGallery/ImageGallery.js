import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'
export const ImageGallery = ({images }) => {
   
    return (
        <ul className="gallery">
            {images.map(image => (<ImageGalleryItem key={image.id} image={image}/>))}

</ul>
    )
    
}