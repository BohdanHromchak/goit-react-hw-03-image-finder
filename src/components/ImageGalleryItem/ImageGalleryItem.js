export const ImageGalleryItem = ({image: {id, webformatURL, tags}}) => {
  
   return (
    <li id={id} className="gallery-item">
    <img src={webformatURL} alt={tags} />
  </li>
   )
}