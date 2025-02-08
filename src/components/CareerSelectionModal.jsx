import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import "../style/careerselectionmodal.css"
export default function CareerSelectionModal({ open, onClose, selectedCareers, setSelectedCareers, onSubmit }) {
  const handlePriorityChange = (careerId, newOrder) => {
    let updatedCareers = [...selectedCareers];
    
    const currentIndex = updatedCareers.findIndex((c) => c.careerId === careerId);
    const swapIndex = updatedCareers.findIndex((c) => c.order === newOrder);

    if (swapIndex !== -1) {
      [updatedCareers[currentIndex].order, updatedCareers[swapIndex].order] = [
        updatedCareers[swapIndex].order,
        updatedCareers[currentIndex].order,
      ];
    }
    setSelectedCareers([...updatedCareers.sort((a, b) => a.order - b.order)]);
    console.log("carreras",updatedCareers);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Para finalizar el proceso, define la prioridad</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          {selectedCareers.map((career, index) => (
            <div key={career.careerId} className="career-item">
              <span>{career.careerName}</span>
              <div className="priority-buttons">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className={`priority-button ${
                      career.order === num ? "blue" : "gray"
                    }`}
                    onClick={() => handlePriorityChange(career.careerId, num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={onSubmit} color="primary" variant="contained">Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
}
