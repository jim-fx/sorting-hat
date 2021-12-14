interface QuestionData {
	description: string;
	answers?: string[];
}

interface DataSet {
	description: string;
	questions: QuestionData[];
}
