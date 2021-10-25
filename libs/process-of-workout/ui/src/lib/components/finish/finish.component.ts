import { Component, OnInit } from '@angular/core';
import { WorkoutStateFacade } from '@pet/workouts/feature';
import { ExecutedWorkout } from '@pet/shared/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Container, Main } from 'tsparticles';

@Component({
  selector: 'pet-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {
  executedWorkout: ExecutedWorkout | undefined;
  workoutKey: string;
  id: string ;

  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
   particlesOptions: any;


  constructor(private workoutFacade: WorkoutStateFacade, private route: ActivatedRoute, private router: Router) {

    this.workoutKey = this.route.snapshot.params.workout_key;
    this.id = "tsparticles";
    // this.particlesOptions = {
    //   background: {
    //     color: {
    //       value: "#1f1f1f"
    //     }
    //   },
    //   fpsLimit: 60,
    //
    //
    //   particles: {
    //     color: {
    //       value: "#ffffff"
    //     },
    //     links: {
    //       color: "#ffffff",
    //       distance: 150,
    //       enable: true,
    //       opacity: 0.5,
    //       width: 1
    //     },
    //     collisions: {
    //       enable: true
    //     },
    //     move: {
    //       direction: "none",
    //       enable: true,
    //       outMode: "bounce",
    //       random: false,
    //       speed: 6,
    //       straight: false
    //     },
    //     number: {
    //       density: {
    //         enable: true,
    //         value_area: 800
    //       },
    //       value: 80
    //     },
    //     opacity: {
    //       value: 0.5
    //     },
    //     shape: {
    //       type: "circle"
    //     },
    //     size: {
    //       random: true,
    //       value: 5
    //     }
    //   },
    //   detectRetina: true
    // };
 }

  particlesLoaded(container: Container): void {
    console.log(container);
  }

  particlesInit(main: Main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }

  home(){
    this.router.navigate([''])
  }

  ngOnInit(): void {
    this.workoutFacade.currentExecutedWorkout$.subscribe((data) => {
      if(data){
        this.executedWorkout = data
      } else {
        this.workoutFacade.getExecutedWorkout(this.workoutKey)
      }
    })
  }

}
