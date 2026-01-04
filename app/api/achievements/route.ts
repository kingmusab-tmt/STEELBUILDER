import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Achievement from "@/models/achievement";

export async function GET() {
  try {
    await connectDB();
    const achievements = await Achievement.find().sort({ order: 1 });
    const transformedAchievements = achievements.map((achievement) => ({
      id: achievement._id.toString(),
      number: achievement.number,
      label: achievement.label,
      suffix: achievement.suffix || "+",
      order: achievement.order,
    }));
    return NextResponse.json(transformedAchievements);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load achievements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const achievement = new Achievement(body);
    await achievement.save();
    const transformed = {
      id: achievement._id.toString(),
      number: achievement.number,
      label: achievement.label,
      suffix: achievement.suffix || "+",
      order: achievement.order,
    };
    return NextResponse.json(transformed, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add achievement" },
      { status: 500 }
    );
  }
}
