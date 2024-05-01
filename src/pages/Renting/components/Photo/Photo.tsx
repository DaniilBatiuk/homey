import clsx from "clsx";
import { Dispatch, SetStateAction, useRef } from "react";
import { ReactSortable } from "react-sortablejs";

import { ICONS } from "@/constants";

import "./Photo.scss";

type photoProp = {
  photos: { id: string; file: File }[];
  setPhotos: Dispatch<SetStateAction<{ id: string; file: File }[]>>;
};

export const Photo: React.FC<photoProp> = ({ photos, setPhotos }: photoProp) => {
  const filePicker = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const files = Array.from(event.target.files);

    const newFiles = files.filter(file => {
      return !photos.some(photo => photo.file.name === file.name);
    });

    const newPhotos = newFiles.map(file => ({
      id: file.name,
      file: file,
    }));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const handlerDelete = (photo: { id: string; file: File }) => {
    setPhotos(prev => prev.filter(currentPhoto => currentPhoto.id !== photo.id));
  };

  return (
    <div className="photo__content">
      <h1 className="renting__title">
        {photos.length > 0 ? "Done! Do you like it? " : "Upload a photo of your accommodation"}
      </h1>
      <h2 className="renting__subtitle">
        {photos.length > 0
          ? "Drag the photo to change the order"
          : "Add a minimum of 5 photos to complete your advert"}
      </h2>
      {photos.length <= 0 && (
        <div className="photo__add">
          {ICONS.photoUpload()}
          <button
            type="button"
            onClick={() => {
              if (filePicker && filePicker.current) {
                filePicker.current.click();
              }
            }}
          >
            Add a photo
          </button>
        </div>
      )}

      {photos.length > 0 && (
        <ReactSortable id="list" list={photos} setList={setPhotos} className="photo__list">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={clsx("photo__item", {
                ["full-width"]: index === 0,
              })}
            >
              <img src={URL.createObjectURL(photo.file)} alt={`Photo ${index}`} />
              {ICONS.deleteImage({ className: "delete", onClick: () => handlerDelete(photo) })}
            </div>
          ))}
          <div
            className="photo__item photo__item-plus"
            onClick={() => {
              if (filePicker && filePicker.current) {
                filePicker.current.click();
              }
            }}
          >
            {ICONS.plusImage()}
            <p>Add more</p>
          </div>
        </ReactSortable>
      )}
      <input
        ref={filePicker}
        type="file"
        accept="image/*,.png,.jpg,.gif,.web,"
        style={{ display: "none" }}
        onChange={handleImageUpload}
        multiple
      />
    </div>
  );
};
