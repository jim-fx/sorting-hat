interface QuestionData {
	description: string;
	answers?: string[];
	correct?: number;
}

interface DataSet {
	description: string;
	questions: QuestionData[];
}
