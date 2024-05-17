import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckingService } from './checking.service';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css'],
})
export class CheckingComponent implements OnInit {
  qualityCheckForm: FormGroup;
  childaccordionCompletionStatus: any; // Nested array for child accordions
  data = [
    {
      id: 1,
      name: 'QC1',
      stages: [
        { id: 1, process: 'pending' },
        { id: 2, process: 'pending' },
      ],
    },
    {
      id: 2,
      name: 'QC2',
      stages: [
        { id: 1, process: 'pending' },
        { id: 2, process: 'pending' },
      ],
    },
    {
      id: 3,
      name: 'QC3',
      stages: [
        { id: 1, process: 'pending' },
        { id: 2, process: 'pending' },
      ],
    },
    {
      id:4,
      name: 'QC4',
      stages: [
        { id: 1, process: 'pending' },
        { id: 2, process: 'pending' },
      ],
    },
  ];

  constructor(
    private fb: FormBuilder,
    private qcService: CheckingService,
    private snackBar: MatSnackBar // Snackbar for displaying messages
  ) {
    // Initialize form group and childaccordionCompletionStatus array
    this.qualityCheckForm = this.fb.group({
      qualityChecks: this.fb.array([]),
    });
    this.childaccordionCompletionStatus = [];
  }

  ngOnInit() {
    // Set up the form and initialize childaccordionCompletionStatus
    this.setQualityChecks();
  }

  // Getter function for accessing the qualityChecks form array
  get qualityChecks(): any {
    return this.qualityCheckForm.get('qualityChecks') as any;
  }

  // Initialize qualityChecks form array and childaccordionCompletionStatus
  setQualityChecks() {
    this.data.forEach((qc, qcIndex) => {
      // Create form group for each quality check
      const qcGroup = this.fb.group({
        name: [qc.name, Validators.required], // Name field with validation
        stages: this.fb.array([]), // Array for stages
      });

      this.childaccordionCompletionStatus[qcIndex] = []; // Initialize child accordion completion status
      qc.stages.forEach((stage, stageIndex) => {
        // Create form group for each stage
        const stageGroup = this.fb.group({
          process: [stage.process, Validators.required], // Process field with validation
          qcStatus: ['', Validators.required], // QC status field with validation
          rejectionReason: [''], // Rejection reason field
        });

        // Push the stage form group to the stages form array
        (qcGroup.get('stages') as FormArray).push(stageGroup);

        // Initialize child accordion completion status for the stage
        this.childaccordionCompletionStatus[qcIndex][stageIndex] =
          stageIndex === 0 && qcIndex == 0;
        //console.log(this.childaccordionCompletionStatus);
      });

      // Push the quality check form group to the qualityChecks form array
      this.qualityChecks.push(qcGroup);

      // Subscribe to valueChanges of the form group to check accordion completion
      qcGroup.valueChanges.subscribe(() =>
        this.checkAccordionCompletion(qcIndex, 0)
      );
    });
  }

  // Check if the accordion is complete based on the form group's validity
  checkAccordionCompletion(index: number, num: any) {
    const currentAccordion = this.qualityChecks.at(index) as FormGroup;
    if (currentAccordion.valid) {
      // Set completion status to true if valid
      this.childaccordionCompletionStatus[index + 1][num] = true;
      //console.log(`Accordion ${index} is complete`);
    } else {
      // Set completion status to false if invalid
      this.childaccordionCompletionStatus[index + 1][num] = false;
      //console.log(`Accordion ${index} is not complete`);
    }
  }

  // Handle completion of child accordion
  onChildAccordionFinish(qcIndex: number, stageIndex: number) {
    //console.log(qcIndex, stageIndex);
    const currentAccordion = this.qualityChecks.at(qcIndex) as FormGroup;
    const stages = currentAccordion.get('stages') as FormArray;
    const childCurrent = stages.at(stageIndex) as FormGroup;
    //console.log(childCurrent, currentAccordion);

    if (childCurrent.valid) {
      // Set child accordion completion status to true if valid
      this.childaccordionCompletionStatus[qcIndex][stageIndex] = true;
      //console.log(`Stage ${stageIndex} of QC ${qcIndex} is complete`);

      // If there's a next stage, enable it
      if (stageIndex < stages.length - 1) {
        this.childaccordionCompletionStatus[qcIndex][stageIndex + 1] = true;
      }
    } else {
      //console.log(`Stage ${stageIndex} of QC ${qcIndex} is not complete`);
    }
  }
  finaldata: any; // Declare a variable to store the final form data

  onSubmit() {
    // Check if the form is valid
    if (this.qualityCheckForm.valid) {
      // Log the form value to the //console
      //console.log(this.qualityCheckForm.value);

      // Store the form value in finaldata
      this.finaldata = this.qualityCheckForm.value;

      // Submit the form data to the service
      this.qcService.submitQualityCheck(this.qualityCheckForm.value).subscribe(
        // Handle successful response
        (response) => {
          // Show a success message using a snackbar
          this.snackBar.open('Form submitted successfully', 'Close', {
            duration: 3000,
          });
          // Uncomment the next line to log the response to the //console
          // //console.log('Form submitted successfully', response);
        },
        // Handle error response
        (error) => {
          // Show an error message using a snackbar
          // Commented out for now
          // this.snackBar.open('Error submitting form', 'Close', { duration: 3000 });
          // Log the error to the //console
          // //console.error('Error submitting form', error);
        }
      );
    } else {
      // Show an error message using a snackbar if the form is invalid
      this.snackBar.open('Form is invalid', 'Close', {
        duration: 3000,
      });
      // Uncomment the next line to log a message to the //console
      // //console.log('Form is invalid');
    }
  }
}
