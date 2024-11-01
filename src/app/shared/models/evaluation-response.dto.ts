import {EvaluationStatusEnum} from "../enums/evaluation-status.enum";

export interface EvaluationResponseDto {
    id?: string;
    evaluationDate?: string;
    status?: EvaluationStatusEnum;
    refuseReason?: string;
    canAppeal?: boolean;
}
