
import { Router, Request, Response } from 'express';
import { pdfGeneratorService } from './pdfGeneratorService'; 
import { pdfGenerator } from './pdfGenerator'; 
import { authenticateUser } from '../../account/middleware/authMiddleware';

const pdfRouter = Router();

pdfRouter.get('/pdf/demo/:type/:metric/:project/:currency', async (req: Request, res: Response) => {
   
    try {

        const { type, metric, project, currency } = req.params;
      
        const pdfBuffer = await pdfGenerator.generateReportPdf( type as any, metric as any, project  as any, currency as any);
        const fileName = `lecture-report-demo.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader("Content-Encoding", "identity"); 
        res.end(pdfBuffer);  

    } catch (error) {
        console.error(`Failed to generate PDF:`, error);
        res.status(500).send({ message: 'Internal server error while generating PDF.' });
    }
});

pdfRouter.get('/pdf/main/:type/:metric/:project/:currency', authenticateUser, async (req: Request, res: Response) => {

    try {

        const { type, metric, project, currency } = req.params;
      
        const pdfBuffer = await pdfGeneratorService.generateReportPdf(type as any, metric as any, project as any, currency as any);
        const fileName = `lecture-report.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader("Content-Encoding", "identity"); 
        res.end(pdfBuffer);  

    } catch (error) {
        console.error(`Failed to generate PDF :`, error);
        res.status(500).send({ message: 'Internal server error while generating PDF.' });
    }
});

export default pdfRouter;