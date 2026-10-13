import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ReportCardsService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(studentId: string, academicYearId?: string) {
    const student = await this.prisma.userStudent.findUnique({
      where: { id: studentId },
      include: { user: true, grades: { include: { subject: true } } },
    });

    if (!student) throw new Error('Student not found');

    const uploadsDir = process.env.UPLOADS_DIR || './uploads';
    const dir = join(process.cwd(), uploadsDir, 'reportcards');
    mkdirSync(dir, { recursive: true });

    const filename = `${student.user.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    const filepath = join(dir, filename);

    const doc = new PDFDocument();
    const stream = createWriteStream(filepath);
    doc.pipe(stream);

    doc.fontSize(18).text('Weta R. C. Basic School', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('Report Card');
    doc.text(`Name: ${student.user.name}`);
    doc.text(`Admission No: ${student.admissionNo}`);
    doc.moveDown();

    student.grades.forEach((g) => {
      doc.text(`${g.subject.name} - ${g.examName}: ${g.score}/${g.maxScore}`);
    });

    doc.end();

    await new Promise((resolve) => stream.on('finish', resolve));

    const report = await this.prisma.reportCard.create({
      data: {
        studentId,
        academicYearId,
        reportData: { generatedFor: student.user.name, grades: student.grades },
        pdfPath: `/uploads/reportcards/${filename}`,
      },
    });

    return { report, url: report.pdfPath };
  }
}
