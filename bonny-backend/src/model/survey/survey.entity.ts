import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Quest } from '../quest/quest.entity';
import { Profile } from '../profile/profile.entity';
import { Auditable } from 'src/audit/auditable.entity';

@Entity()
export class Survey extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  points: number;

  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];

  @OneToOne(() => Quest, (quest) => quest.survey)
  quest: Quest;
}

@Entity()
export class Question extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  order: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @OneToMany(() => QuestionOption, (questionOption) => questionOption.question)
  options: QuestionOption[];
}

@Entity()
export class QuestionOption extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}

@Entity()
export class Answer extends Auditable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.questionAnswers)
  profile: Profile;

  @ManyToOne(() => Question, (question) => question.id)
  question: Question;

  @ManyToOne(() => QuestionOption, (questionOption) => questionOption.id, {
    nullable: true,
  })
  selectedOption: QuestionOption;

  @Column('text', { nullable: true })
  freeText: string; // For open-ended questions, if applicable
}
