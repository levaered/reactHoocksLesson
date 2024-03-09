import { useState } from 'react'
import './Card.css'

function Card({ id, image, name }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="img-wrapper" style={{ backgroundImage: `url(${image})` }} data-bs-toggle="modal" data-bs-target={`#${id}`}>
            </div>
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}-label`} aria-hidden={!modalOpen}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalOpen(false)}></button>
                        </div>
                        <div className="modal-body" style={{ backgroundImage: `url(${image})`, height: "25rem", width: "100%", backgroundSize: "cover", backgroundPosition: "center" }}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
