import type { Definition } from "@/common/models/Definition";
import { HttpService } from "@/modules/httpService/httpService";
import type { CreateDefinitionDto } from "shared";

class KnowledgeService extends HttpService {

    async getDefinitions(defsArr: number[]): Promise<Definition[]> {
        const params = new URLSearchParams();
        defsArr.forEach(id => params.append('ids', id.toString()));
        return await this.authorizedReq(false).get(`knowledge/definitions?${params.toString()}`).json();
    }

    async getCourseDefinitions(courseId: string): Promise<Definition[]> {
        return await this.authorizedReq(false).get(`knowledge/definition/${courseId}`).json();
    }

    async createDefinition(createDef: CreateDefinitionDto): Promise<Definition> {
        return await this.authorizedReq(false).post('knowledge/definition', { json: createDef }).json();
    }

    async deleteDef(id: number) {
        return await this.authorizedReq(false).delete(`knowledge/definition/${id}`).json();
    }
}

export const knowledgeService = new KnowledgeService();