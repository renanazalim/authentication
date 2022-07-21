import AuthorizationRequest from "../../src/domain/interface/request/AuthorizationRequest";
import AuthorizationResponse from "../../src/domain/interface/response/AuthorizationResponse";
import AuthorizationUseCase from "../../src/useCase/AuthorizationUseCase";
import { getValidAuthorizeRequest } from "../util/validObject";

describe('Authorize user', () => {
    
    it('request.event.type is invalid then returns access denied', async () => {
        expect.hasAssertions();
    
        const request: AuthorizationRequest = getValidAuthorizeRequest();
        request.event.type = 'InvalidType' as 'REQUEST';
    
        let response: AuthorizationResponse;
        let error: any;
        try {
          response = await AuthorizationUseCase.execute(request);
        } catch (e) {
          error = e;
        }
    
        expect(error).toBeUndefined();
        expect(response.success).toBeFalsy();
      });

});