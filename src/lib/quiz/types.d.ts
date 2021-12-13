interface QuestionData {
	description: string;
	answers?: string[];
	timeout?: number;
}

interface DataSet {
	description: string;
	questions: QuestionData[];
}
